from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/process_wav_blob', methods=['POST'])
def process_wav_blob():
    wav_blob = request.files.get('wav_blob')
    # Do something with the WAV blob here, such as saving it to disk or processing it
    return jsonify({'success': True})


if __name__ == '__main__':
    # Load the linear regression model
    app.run(port=9000,debug=True)
