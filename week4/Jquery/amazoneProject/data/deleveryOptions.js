export const deleveryOptions=[

  {
    id:'1',
    deliveryDays:7,
    priceCents:0
  },
  {
    id:'2',
    deliveryDays:3,
    priceCents:499
  },
  {
    id:'3',
    deliveryDays:1,
    priceCents:999
  }
]


export function getdileveryOptions(deleveryOptionId){
  let deleveryOption;

  deleveryOptions.forEach((option)=>{
    if(option.id===deleveryOptionId){
      deleveryOption=option;
      
    }
  })

  return deleveryOption || deleveryOptions[0];
}
console.log("getdileveryOptions",getdileveryOptions());