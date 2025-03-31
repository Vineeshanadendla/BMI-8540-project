from flask import Flask, render_template, request, jsonify
import os
import pandas as pd

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['file']
    if file:
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filepath)

        data = pd.read_csv(filepath)
        data['Bacteria name'] = data['Bacteria name'].str.replace(':', '').str.strip()
        data['Category'] = data['Significance'].apply(lambda x: 
            'Probiotic' if 'probiotic' in x.lower() else 
            'Pathogen' if 'pathogen' in x.lower() or 'disease' in x.lower() else 
            'Industrial' if 'industrial' in x.lower() or 'production' in x.lower() else 
            'Research-model' if 'model organism' in x.lower() else 'Other')

        type_counts = data['Type'].value_counts().to_dict()
        category_counts = data['Category'].value_counts().to_dict()

        return jsonify({
            'type_counts': type_counts,
            'category_counts': category_counts
        })

    return jsonify({"error": "No file provided"}), 400

if __name__ == '__main__':
    app.run(debug=True)
