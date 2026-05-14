from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Store appointments temporarily
appointments = []

@app.route('/')
def home():
    return "Hospital Backend Running Successfully"

# LOGIN API
@app.route('/login', methods=['POST'])
def login():

    data = request.json

    username = data.get('username')
    password = data.get('password')

    if username == "patient" and password == "1234":

        return jsonify({
            "message": "Patient Login Successful",
            "role": "patient"
        })

    elif username == "doctor" and password == "1234":

        return jsonify({
            "message": "Doctor Login Successful",
            "role": "doctor"
        })

    else:

        return jsonify({
            "message": "Invalid Credentials"
        })


# ADD APPOINTMENT
@app.route('/appointments', methods=['POST'])
def add_appointment():

    data = request.json

    appointments.append(data)

    return jsonify({
        "message": "Appointment Added"
    })


# GET APPOINTMENTS
@app.route('/appointments', methods=['GET'])
def get_appointments():

    return jsonify(appointments)


if __name__ == '__main__':
    app.run(debug=True)