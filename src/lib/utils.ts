export function discrptionSlice(description: string, max = 50){
  if(description.length >= max) 
    return `${description.slice(0,max)}...`;
  else return description;
}

export function capitalizeTitle(title: string){
  const str = title.split(" ");
  for(let i =0; i < str.length; i++){
    str[i] = str[i][0].toUpperCase() + str[i].substring(1);
  }
  return str.join(" ");
}
