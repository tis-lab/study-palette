FROM python:latest
MAINTAINER TraCS AppDev Team <appdev@tracs.unc.edu>

ENV PYTHONUNBUFFERED=1

# These labels are used by OpenShift in order to display information inside the project
LABEL io.k8s.description="BDC Data Portal API" \
 io.k8s.display-name="BDC Data Portal API" \
 io.openshift.expose-services="8080:http"

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN python -m load_seed_data

EXPOSE 8080
CMD ["uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "8080"]