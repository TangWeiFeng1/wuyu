FROM python:3.8

WORKDIR /var/www/html/wuyu

RUN apt-get update && apt-get install -y apt-utils
RUN apt-get update && apt install -y apache2
RUN apt-get update && apt-get install -y libapache2-mod-wsgi-py3

RUN chmod -R 777 /var/www

COPY requirements.txt .
RUN pip3 install -r requirements.txt

COPY . /var/www/html/wuyu

EXPOSE 80


COPY --chown=root:root ./my_django_app.conf .


RUN a2enconf my_django_app.conf

CMD ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]
