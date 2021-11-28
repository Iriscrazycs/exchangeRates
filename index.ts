import express from 'express';
const app = express();
const Exchange=require('./config/config.ts');
const PORT = 3003;
const axios=require('axios');
app.use(express.json());

const url=process.env.URL;

interface IDailyReport {
    amount: number,
    base: string,
    date: string,
    rates: IexchangeRate
}

interface IexchangeRate{
    AUD: number,
    BGN:number,
    BRL:number,
    CAD:number,
    CHF:number,
    CNY:number,
    CZK:number,
    DKK:number,
    GBP:number,
    HKD:number,
    HRK:number,
    HUF:number,
    IDR:number,
    ILS:number,
    INR:number,
    JPY:number,
    KRW:number,LTL:number,
    MXN:number,MYR:number,NOK:number,NZD:number,PHP:number,PLN:number,RON:number,RUB:number,SEK:number,SGD:number,THB:number,TRY:number,USD:number,ZAR:number

}


function getData<IDailyReport>(url: any): Promise<IDailyReport[]>{
    return axios.get(url)
        .then((result: any)=>{
            Exchange.add(result.data);
            
                        
        })
        .catch((error: any) => {
            console.log("Error: ",error);
            
            
        });
}





function getHighest(){
    var highestRate=Exchange.get()
            .then((result: any)=>{
                const snapshot=result.docs;
                snapshot.map((doc: any)=>{
                   var dataList=new Rates(doc.data().rates);
                   result=dataList.highestRate();
                    
                })
                
                return result;
            });
            
    const getResult=()=>{
        highestRate.then((res:number)=>{
            console.log("The highest exchange rate is ",res);
            
        })
    };

    getResult();

    
}

class Rates{
    ratesCol: IexchangeRate;

    constructor(col: IexchangeRate){
        this.ratesCol= col;
    }

    highestRate():number{
        var highest=this.ratesCol.AUD;
        let k: keyof IexchangeRate;
        for (k in this.ratesCol){
            if(this.ratesCol[k]>highest){
                highest=this.ratesCol[k];
            }

        }
        return highest;

    }
    
}

getData<IDailyReport>(url)
            .then(result=>{
                console.log("Data importing is OK.");
                
            })
            .catch((error: any) => {
                console.log("Error: ",error);
                
                
            });


getHighest();



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});