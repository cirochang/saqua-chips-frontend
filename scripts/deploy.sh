scp -i ~/.ssh/id_rsa ~/Projects/saqua-chips-frontend/saqua-chips-frontend.zip pi@10.3.141.1:
ssh -i ~/.ssh/id_rsa pi@10.3.141.1 <<'ENDSSH'
rm -rf saqua-chips-frontend
mkdir saqua-chips-frontend
unzip -o ~/saqua-chips-frontend.zip -d ~/saqua-chips-frontend/
ENDSSH
