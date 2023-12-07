import tkinter as tk
from tkinter import ttk

# Define the App class
class App(tk.Tk):
    def __init__(self):
        super().__init__()

        self.title("SustainaByte App")
        self.geometry('320x620')  # iPhone 12 size

        # Create top and bottom frames with green background
        top_frame = tk.Frame(self, bg='green', height=50)
        bottom_frame = tk.Frame(self, bg='green', height=50)

        # Layout the top and bottom frames
        top_frame.pack(side="top", fill="x")
        bottom_frame.pack(side="bottom", fill="x")

        # Create the main content frame with a white background
        content_frame = tk.Frame(self, bg='white')
        content_frame.pack(expand=True, fill="both")

        # Add a label to the content frame as a placeholder
        label = tk.Label(content_frame, text="Mijn Koelkast", bg='white')
        label.pack(pady=20)  # Add some padding on the y-axis

        # Add a label to the top frame with the text "SustainaByte"
        top_label = tk.Label(top_frame, text="SustainaByte", bg='green', fg='white', font=("Helvetica", 18))
        top_label.pack(side="left", padx=10, pady=10)  # Add some padding on the left

        # Load the placeholder profile picture icon
        placeholder_icon = tk.PhotoImage(file="C:/Users/jasbh/UserMS/Bureaublad/Project/GUI/placeholder_icon.png")

        # Add a label to the top frame to display the icon
        icon_label = tk.Label(top_frame, image=placeholder_icon, bg='green', height=50, width=50)
        icon_label.photo = placeholder_icon  # Reference to prevent garbage collection
        icon_label.pack(side="right", padx=10, pady=10)  # Add some padding on the left


# Create and run the app
app = App()
app.mainloop()
