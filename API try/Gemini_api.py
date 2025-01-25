import google.generativeai as genai

genai.configure(api_key="AIzaSyBDvvkTiofhVL0t8jHASCGANhntJ1HRVQE")
model = genai.GenerativeModel("gemini-1.5-flash")
response = model.generate_content("Explain how AI works")
print(response.text)


# pip install -U google-generativeai