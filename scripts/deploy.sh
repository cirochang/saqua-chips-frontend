RASP_IP="192.168.0.178" # ROUTER IP
# RASP_IP="10.3.141.1" # RASP WIFI IP
scp -i ~/.ssh/id_rsa ~/Projects/saqua-chips-frontend/saqua-chips-frontend.zip pi@$RASP_IP:
ssh -i ~/.ssh/id_rsa pi@$RASP_IP <<'ENDSSH'
rm -rf saqua-chips-frontend
mkdir saqua-chips-frontend
unzip -o ~/saqua-chips-frontend.zip -d ~/saqua-chips-frontend/
rm saqua-chips-frontend.zip
ENDSSH
