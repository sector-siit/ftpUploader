ftp ftp://siit:Rojo1212@172.16.0.74 <<EOF
prompt
cd api
cd UsuarioUnico
nlist . lista_archivos.txt
bye
EOF
archivos=$(cat lista_archivos.txt | grep -v 'appsettings\|wwwroot\|Mail_template')
for archivo in $archivos
do
echo $archivo
ftp ftp://siit:Rojo1212@172.16.0.74 <<EOF
prompt
cd api
cd UsuarioUnico
pwd
mdelete $archivo
rm $archivo
bye
EOF
done
