from flask import Flask, render_template, request
import csv
import os

app = Flask(__name__)
training_records_file = os.path.join("data", "training_records.csv")
menu_records_file = os.path.join("data", "menu_records.csv")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/training_record', methods=['GET', 'POST'])
def trainingRecord():
    if request.method == 'POST':
        date = request.form['date']
        menu = request.form['menu']
        sets = request.form['set']
        reps = request.form['rep']
        weight = request.form['weight']
        memo = request.form['memo']

        with open(training_records_file, mode='a', newline='') as file:
            writer = csv.writer(file)
            writer.writerow([date, menu, sets, reps, weight, memo])

        return render_template('training_record.html')
    
    with open(menu_records_file, "r") as csvfile:
        reader = csv.reader(csvfile)
        menus = [row[0] for row in reader]  # Extract only the menu names

    return render_template('training_record.html', menus=menus)

@app.route('/training_list')
def trainingList():
    data = []
    with open(training_records_file, mode='r', newline='') as file:
        reader = csv.reader(file)
        for row in reader:
            data.append(row)

    return render_template('training_list.html', data=data)

@app.route('/menu_setting', methods=["GET", "POST"])
def menuSetting():
    if request.method == "POST":
        name = request.form["name"]
        description = request.form["description"]
        
        menu_record = [name, description]
        
        with open(menu_records_file, "a", newline="") as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow(menu_record)

        return render_template("menu_setting.html")    
    
    return render_template("menu_setting.html")

@app.route('/menu_list')
def menuList():
    data = []
    with open(menu_records_file, mode='r', newline='') as file:
        reader = csv.reader(file)
        for row in reader:
            data.append(row)

    return render_template('menu_list.html', data=data)

if __name__ == '__main__':
    app.run(debug=True)
