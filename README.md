# ec2-instances-to-csv
Esto permite obtener un listado de las instancias EC2 en un archivo CSV

para utilizar esta utilidad se necesita

- aws cli
- nodejs

una vez configurado aws cli con las credenciales programaticas se debe ejecutar

./extract-instances-csv.sh

En el mismo directorio se creara un csv con las instancias asociadas a la cuenta logueada con aws cli
