export interface Product {
    title:string,
    category:{name:string},
    imageCover:string,
    price:number,
    ratingsAverage:number
    _id?:string
}
export interface Categories {
   name:string,
   image:string
}
