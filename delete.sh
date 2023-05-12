ftp ftp://$FTP_USER:$FTP_PASS@$FTP_HOST <<EOF
prompt
cd $REMOTE_DIRECTORY
nlist . lista_archivos.txt
bye
EOF
archivos=$(cat lista_archivos.txt | grep -v 'appsettings\|wwwroot\|Mail_template')
for archivo in $archivos
do
echo $archivo
ftp ftp://$FTP_USER:$FTP_PASS@$FTP_HOST <<EOF
prompt
cd api
cd UsuarioUnico
pwd
mdelete $archivo
rm $archivo
bye
EOF
done
