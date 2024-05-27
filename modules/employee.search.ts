import { Telegraf } from "telegraf";
import { config } from "../config";
import { SearchType } from "../config/interfaces/search.type";

export class EmployeeSearchModule{
    ctx: any;
    bot: Telegraf;
    companyName: string | undefined;
    experience: string | undefined;
    salary: string | undefined;
    location: string | undefined;
    description: string | undefined;
    jobType: string | undefined;
    username: string | undefined;
    type: SearchType | undefined;
    step: number;
    imageUrl: string | undefined;


    constructor(bot: any){
        this.bot = bot;
        this.step = 0;
    }

    async controller(ctx: any){
        if(ctx.msg.text == "I am hiring people"){
            this.type = SearchType.employee
        }else if(ctx.msg.text == "I am looking for a job."){
            this.type = SearchType.job
        }
        this.makeShablon(ctx)
    }


       
    async makeShablon(ctx: any){
        
        if(this.type == SearchType.employee){

        const keyboard = [
            ['Dispatch', 'Update'],
            ['Safety', 'Accounting'],
            ['Recruiting', 'Fleet'],
        ]

        console.log(this.step);
        
        if(this.step === 0){
            ctx.reply("Please choose the job position you want to hire", {reply_markup: {
                keyboard,
                resize_keyboard: true 
            }})
            this.step++
        }
        else if(this.step === 1){
            this.jobType = ctx.message.text;

            ctx.reply("Please write name of your company💼")
            this.step++

        }
        else if(this.step === 2){
            this.companyName = ctx.message.text;
           
            this.step++
            ctx.reply("How many experience should candidate have?⌛️") 
        }
        else if(this.step === 3){
            this.experience = ctx.message.text;
           
            this.step++
            ctx.reply("How much you can pay for the candidates? 💵") 
        }
        else if(this.step === 4){
            this.salary = ctx.message.text;
           
            this.step++
            ctx.reply("Where is located your office? 📍") 
        }
        else if(this.step === 5){
            this.location = ctx.message.text;
           
            ctx.reply("Please write full description about your job 🎯 ") 
            this.step++
        }
        else if(this.step === 6){
            this.description = ctx.message.text;
           
            ctx.reply("Please write your Telegram username or Phone number") 
            this.step++
        }
        else if(this.step === 7){
            this.username = ctx.message.text;
           
            ctx.reply(`
            Send payment screenshot 🖼

            Prices:
            $6,99/ 1 vacancy
            $29,99/ unlimited vacancies for 1 week
            $49,99/ unlimited vacancies for 1 month
            $199,99/ unlimited vacancies for 1 year

            Card numbers:

            Visa: 4278320027070985
            Uzcard: 8600490488273087

            SARDORBEK ERGASHEV

            Feedbacks and Questions: @HIGHBROWHR

            If everything is correct your vacancy will be posted within 24-48 hours.
            `) 
            this.step++
        }
        
        else if(this.step === 8){
            let imageId: string = "";
            let isPhoto = true;
            

        if(ctx.message?.photo){
            imageId = ctx.message?.photo[ctx.message.photo.length - 1]?.file_id;
            this.imageUrl = await (await this.bot.telegram.getFileLink(imageId)).href;
            this.sendImage(ctx, imageId, isPhoto);
        }

        else if(ctx.message?.document){
            imageId = ctx.message?.document?.file_id;
            isPhoto = false;
            this.imageUrl = await (await this.bot.telegram.getFileLink(imageId)).href;
            this.sendImage(ctx, imageId, isPhoto);
        }

            this.step = 0;
        }

        }
        
        else if(this.type == SearchType.job){
            const keyboard = [
                ['Dispatch', 'Update'],
                ['Safety', 'Accounting'],
                ['Recruiting', 'Fleet'],
            ]
    
            console.log(this.step);
            
            if(this.step === 0){
                ctx.reply("Please choose one option are you looking for a job or hiring people for your company?", {reply_markup: {
                    keyboard,
                    resize_keyboard: true 
                }})
                this.step++
            }
            else if(this.step === 1){
                this.jobType = ctx.message.text;
    
                ctx.reply("Please write your full name 💼")
                this.step++
    
            }
            else if(this.step === 2){
                this.companyName = ctx.message.text;
               
                this.step++
                ctx.reply("How many experience you have?⌛️") 
            }
            else if(this.step === 3){
                this.experience = ctx.message.text;
               
                this.step++
                ctx.reply("How much money you are expacting from the company? 💵") 
            }
            else if(this.step === 4){
                this.salary = ctx.message.text;
               
                this.step++
                ctx.reply("Please write your current location 📍") 
            }
            else if(this.step === 5){
                this.location = ctx.message.text;
               
                ctx.reply("Please write full description about your self 🎯") 
                this.step++
            }
            else if(this.step === 6){
                this.description = ctx.message.text;
               
                ctx.reply("Please write your Telegram username or Phone number") 
                this.step++
            }
            else if(this.step === 7){
                this.username = ctx.message.text;
               
                ctx.reply(`
                Send payment screenshot 🖼

                Prices:
                $6,99/ 1 vacancy
                $29,99/ unlimited vacancies for 1 week
                $49,99/ unlimited vacancies for 1 month
                $199,99/ unlimited vacancies for 1 year

                Card numbers:

                Visa: 4278320027070985
                Uzcard: 8600490488273087

                SARDORBEK ERGASHEV

                Feedbacks and Questions: @HIGHBROWHR

                If everything is correct your vacancy will be posted within 24-48 hours.
                `) 
                this.step++
            }
            
            else if(this.step === 8){
                let imageId: string = "";
                let isPhoto = true;
                
    
            if(ctx.message?.photo){
                imageId = ctx.message?.photo[ctx.message.photo.length - 1]?.file_id;
                this.imageUrl = await (await this.bot.telegram.getFileLink(imageId)).href;
                this.sendImage(ctx, imageId, isPhoto);
            }
    
            else if(ctx.message?.document){
                imageId = ctx.message?.document?.file_id;
                isPhoto = false;
                this.imageUrl = await (await this.bot.telegram.getFileLink(imageId)).href;
                this.sendImage(ctx, imageId, isPhoto);
            }
    
                this.step = 0;
            }
        }
        
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////







    async sendImage(ctx: any, imageId: string, isPhoto: boolean){
        const keyboard = [
            ['I am hiring people', 'I am looking for a job.']
        ]
            
            await ctx.reply(
            "ok", {reply_markup: {
                keyboard,
                resize_keyboard: true 
            }}
            )
            const messageForResponse: string = `<b>Looking for ${this.type} From</b> ${ctx.from.username ? ctx.from.username : this.username}`
            await this.bot.telegram.sendMessage(config.group_id, messageForResponse, {
                parse_mode: "HTML"
            })
            if(!isPhoto){
                console.log("document");
                await this.bot.telegram.sendDocument(config.group_id, imageId)
                await ctx.replyWithDocument(imageId)
            }
            else{
                console.log("photo");
                await this.bot.telegram.sendPhoto(config.group_id, imageId);
                await ctx.replyWithPhoto(imageId)
            }

            
            ///////////

            const message = 
            `
            <b>${this.jobType}</b>
            Company name: ${this.companyName}
            Experince: ${this.experience}
            Salary: ${this.salary}
            Location: ${this.location}
            Description: ${this.description}
            ${
                this.username ?  `Username: ${this.username}` : `Username: ${ctx.from.username}`
            }
            `;

            const messageForJob = 
            `
            <b>${this.jobType}</b>
            Full name: ${this.companyName}
            Experince: ${this.experience}
            Salary: ${this.salary}
            Location: ${this.location}
            Description: ${this.description}
            ${
                this.username ?  `Username: ${this.username}` : `Username: ${ctx.from.username}`
            }
            `;

        await this.bot.telegram.sendMessage(config.group_id, 
            this.type == SearchType.employee ? message : messageForJob
             , { parse_mode: 'HTML' }
        )
        
        await ctx.replyWithHTML(message)
            this.step = 0;
    }
}