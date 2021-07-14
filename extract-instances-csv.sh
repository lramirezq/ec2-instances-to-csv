#
#instances
# requisitos:
# - aws cli 
# - nodejs

#borrar archivos existentes
rm -rf *.csv
rm -rf *.json 


#extract json with all instances
aws ec2 describe-instances  | jq -r "[[.Reservations[].Instances[]]]" | jq -r ".[]"  > instances.json


#convert to csv 
node get_instances.js  > $(date '+%Y%m%d%H%M%S')_instances.csv