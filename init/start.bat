D:
cd D:\\GitHub\\PersonalPage 
start python manage.py runserver 0.0.0.0:8000
start python update.py
timeout /t 5
start /B D:\\GitHub\\PersonalPage\\init\\browser
exit