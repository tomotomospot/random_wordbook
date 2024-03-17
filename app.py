from flask import Flask, render_template, request, jsonify
from gensim.models import KeyedVectors
import random

app = Flask(__name__)

model_path = 'entity_vector.model.bin'
model = KeyedVectors.load_word2vec_format(model_path, binary=True)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get-words', methods=['POST'])
def get_words():
    word_count = int(request.form.get('wordCount', 5))
    random_words = random.sample(list(model.key_to_index.keys()), word_count)
    return jsonify(random_words)

if __name__ == '__main__':
    app.run(debug=True)
