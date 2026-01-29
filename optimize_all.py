import os
from PIL import Image

# Target directory
target_dir = r"c:\Users\ruben\OneDrive\Escritorio\Vraivelo\frontend\public\vraivelo_berria"
max_width = 1600

def optimize_directory(directory):
    total_original_size = 0
    total_new_size = 0
    count = 0

    print(f"Scanning {directory}...")

    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.lower().endswith(('.jpg', '.jpeg', '.png')):
                path = os.path.join(root, file)
                try:
                    original_size = os.path.getsize(path)
                    
                    # Open and process
                    with Image.open(path) as img:
                        # Skip if already small enough
                        if img.width <= max_width and original_size < 500 * 1024:
                             # print(f"Skipping {file} (already optimized)")
                             continue

                        # Resize if needed
                        if img.width > max_width:
                            ratio = max_width / img.width
                            new_height = int(img.height * ratio)
                            img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
                        
                        # Save
                        img.save(path, "JPEG", quality=85, optimize=True)
                    
                    new_size = os.path.getsize(path)
                    total_original_size += original_size
                    total_new_size += new_size
                    count += 1
                    
                    print(f"Optimized {file}: {original_size/1024/1024:.1f}MB -> {new_size/1024/1024:.1f}MB")

                except Exception as e:
                    print(f"Error processing {file}: {e}")

    print("-" * 40)
    print(f"Total processed: {count} images")
    print(f"Total size before: {total_original_size / 1024 / 1024:.2f} MB")
    print(f"Total size after:  {total_new_size / 1024 / 1024:.2f} MB")
    print(f"Space saved:       {(total_original_size - total_new_size) / 1024 / 1024:.2f} MB")

if __name__ == "__main__":
    optimize_directory(target_dir)
