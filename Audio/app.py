from flask import Flask, request, send_file, render_template_string
import os
from spleeter.separator import Separator
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['SEPARATED_FOLDER'] = 'separated'

# Ensure the directories exist
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
os.makedirs(app.config['SEPARATED_FOLDER'], exist_ok=True)

separator = Separator('spleeter:2stems')

@app.route('/')
def upload_form():
    return render_template_string('''
        <html>
        <body>
            <h1>Upload an Audio File</h1>
            <form action="/upload" method="post" enctype="multipart/form-data">
                <input type="file" name="file">
                <input type="submit" value="Upload">
            </form>
        </body>
        </html>
    ''')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return "No file part", 400
    
    file = request.files['file']
    if file.filename == '':
        return "No selected file", 400
    
    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)
    
    # Perform separation
    output_path = os.path.join(app.config['SEPARATED_FOLDER'], filename.split('.')[0])
    separator.separate_to_file(file_path, output_path)
    
    accompaniment_file = os.path.join(output_path, 'accompaniment.wav')
    vocals_file = os.path.join(output_path, 'vocals.wav')
    
    return render_template_string('''
        <html>
        <body>
            <h1>Download Separated Files</h1>
            <p><a href="/download/accompaniment/{{ accompaniment_file }}">Download Instrumental</a></p>
            <p><a href="/download/vocals/{{ vocals_file }}">Download Vocals</a></p>
        </body>
        </html>
    ''', accompaniment_file=accompaniment_file, vocals_file=vocals_file)

@app.route('/download/<stem>/<path:filename>')
def download_file(stem, filename):
    return send_file(filename, as_attachment=True)

if __name__ == "__main__":
    app.run(debug=True)
