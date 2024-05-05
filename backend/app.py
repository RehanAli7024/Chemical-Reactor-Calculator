from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/CSTR_conversion', methods = ['POST'])
def cstr_conversion():
    data = request.json
    V = float(data['volume'])
    F = float(data['flowRate'])
    X = float(data['conversion'])
    r = float(data['reactionRate'])
    if V < 0:
        result =  F * X / r
        unknown = 'volume'
    elif F < 0:
        result =  V * r / (X)
        unknown = 'flowRate'
    elif X < 0:
        result =  min((V * r)/F,1)
        unknown = 'conversion'

    else:
        result =  F * (X) / V
        unknown = 'rate'
    return jsonify({'unknown': unknown, 'result' : result})



if __name__ == '__main__':
    app.run(debug=True)


