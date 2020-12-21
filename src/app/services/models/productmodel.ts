export class Product{
    public id:number;
    public name:string;
    public article:string;
    public price: string;
    public manufacture: string;
    public category: string;
    public weight: string;
    public amount: number;
    

    constructor(name:string, article:string,price: string,
        manufacture: string,category: string,weight: string,amount: number, id?:number){
            this.id=id;
            this.name=name;
            this.article = article;
            this.price=price;
            this.manufacture=manufacture;
            this.category=category;
            this.weight=weight;
            this.amount=amount; 
         }
}

