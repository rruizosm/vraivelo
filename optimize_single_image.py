import os
from PIL import Image

image_path = r"c:\Users\ruben\OneDrive\Escritorio\Vraivelo\frontend\public\vraivelo_berria\Girona\DSC00329.jpeg"
max_width = 1600

def optimize_image(path):
    if not os.path.exists(path):
        print(f"Error: File not found at {path}")
        return

    try:
        original_size = os.path.getsize(path)
        with Image.open(path) as img:
            # Resize if width > max_width
            if img.width > max_width:
                ratio = max_width / img.width
                new_height = int(img.height * ratio)
                img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
                print(f"Resized to {max_width}x{new_height}")

            # Save with optimization
            img.save(path, "JPEG", quality=85, optimize=True)
            
        new_size = os.path.getsize(path)
        print(f"Optimized {os.path.basename(path)}")
        print(f"Old size: {original_size / 1024 / 1024:.2f} MB")
        print(f"New size: {new_size / 1024 / 1024:.2f} MB")

    except Exception as e:
        print(f"Error optimizing {path}: {e}")

if __name__ == "__main__":
    optimize_image(image_path)
