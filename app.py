from flask import Flask, render_template, request
import csv

app = Flask(__name__)
app.config['DATA_PATH'] = './data/training_records.csv'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/record', methods=['GET', 'POST'])
def record():
    if request.method == 'POST':
        date = request.form['date']
        menu = request.form['menu']
        sets = request.form['set']
        reps = request.form['rep']
        weight = request.form['weight']
        memo = request.form['memo']

        with open(app.config['DATA_PATH'], mode='a', newline='') as file:
            writer = csv.writer(file)
            writer.writerow([date, menu, sets, reps, weight, memo])

        return render_template('record.html')

    return render_template('record.html')

@app.route('/list')
def list():
    data = []
    with open(app.config['DATA_PATH'], mode='r', newline='') as file:
        reader = csv.reader(file)
        for row in reader:
            data.append(row)

    return render_template('list.html', data=data)

if __name__ == '__main__':
    app.run(debug=True)
