
const fs = require('fs');
// First I want to read the file
fs.readFile('instances.json', function read(err, data) {
    if (err) {
        throw err;
    }
    const content = data;

    // Invoke the next step here however you like
  //  console.log(content);   // Put all of the code here (not the best solution)
    processFile(content);   // Or put the next step in a function and invoke it
});

function processFile(content) {
    var mydata = JSON.parse(content);
     
  //Encabezado 
  console.log("ImageId;InstanceId;InstanceType;AvailabilityZone;PrivateDnsName;PrivateIpAddress;PublicDnsName;State;SubnetId;VpcId;Architecture;Volumes;SecurityGroups;Tags;environment"); 
  

    


   for (var i in mydata) {
    obj = mydata[i];
    az= mydata[i].Placement.AvailabilityZone;
    //crear obj para discos BlockDeviceMappings.length
    discos= obj.BlockDeviceMappings;
    dd = "";
    for (var i in discos){
        dd += discos[i].Ebs.VolumeId + " | ";
    }
   // console.log(discos_details);
   
    //crear objeto para las Eni NetworkInterfaces
    enis = obj.NetworkInterfaces
    pdns= "";
    pip="";
  
    enis_details = "";
    for (var i in enis){
        pdns += enis[i].PrivateDnsName + " | ";
        pip += enis[i].PrivateIpAddress + " | ";
    }
   st = obj.State.Name
   sn = obj.SubnetId
   vpc = obj.VpcId
   arq = obj.Architecture
   sg = obj.SecurityGroups
   sgs = ""
  // console.log(sg)
   for (var i in sg){
        sgs += sg[i].GroupId + " | ";
    }

   
   //tags
   tag = obj.Tags
   tags = ""
   for (var i in tag){
        tags += tag[i].Key + " =  " + tag[i].Value +  "   |   ";
    }
   
   tags  = tags.replace(';', ''); 
   env = "";
   if (tags.includes("dev")){
       env = "dev";
   }else if (tags.includes("qa")){
       env = "qa"
   }else if (tags.includes("prod")){
       env = "prod"
   }

   role =  obj.IamInstanceProfile
    irole = JSON.stringify(role);    
   //irole  = irole.replace(';', ''); 

   
    //console.log(mydata[i].ImageId);
   // console.log("ImageId;InstanceId;InstanceType;AvailabilityZone;PrivateDnsName;PrivateIpAddress;PublicDnsName;State;SubnetId;VpcId;Architecture;Volumes:SecurityGroups;Tags"); 
  
   console.log(obj.ImageId+";"+obj.InstanceId+";"+obj.InstanceType+";"+az+";"+pdns+";"+pip+";"+obj.PublicDnsName+";"+st+";"+sn+";"+vpc+";"+arq+";"+dd+";"+sgs+";"+tags+";"+env)

    }
  

}


