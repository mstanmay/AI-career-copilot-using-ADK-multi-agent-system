FROM python:3.11-slim

WORKDIR /app

# Install dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Create uploads directory
RUN mkdir -p /app/uploads

ENV PYTHONPATH=/app

# Railway injects PORT env var; default to 8000 for local
ENV PORT=8000
EXPOSE ${PORT}

# Use shell form so $PORT is expanded at runtime
CMD uvicorn api.server:app --host 0.0.0.0 --port $PORT
