from groq import Groq
from app.config import GROQ_API_KEY, GROQ_MODEL


class LLMService:
    def __init__(self):
        if not GROQ_API_KEY:
            raise ValueError(
                "GROQ_API_KEY is missing. Add it to the .env file."
            )

        self.client = Groq(api_key=GROQ_API_KEY)

    def generate(self, prompt: str) -> str:
        response = self.client.chat.completions.create(
            model=GROQ_MODEL,
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            temperature=0.2,
            max_tokens=700,
        )

        return response.choices[0].message.content.strip()
