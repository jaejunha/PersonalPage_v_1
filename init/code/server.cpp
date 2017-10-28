#include <Windows.h>

void main() {
	HWND hWndConsole = GetConsoleWindow();
	ShowWindow(hWndConsole, SW_HIDE);
	system("D: && cd GitHub\\PersonalPage && python manage.py runserver 0.0.0.0:8000");
}