import { async } from "rxjs";
import { Telegraf, Markup, Context } from "telegraf"
import { Languages } from "./config/enums";


const token: string = "6511889767:AAGUbSIpt7YGtlgFXAxl0mzxkrTUwnePCII";

 const bot: Telegraf = new Telegraf(token)

declare module "telegraf" {
    interface  Context{
        language: Languages;
    }
}

let step = 0;
const keyboard = [
    ['Dispatch', 'Update'],
    ['Safety', 'Accounting'],
    ['Recruiting', 'Fleet'],
]

    let language_button_id: number;
  
    bot.start((ctx) => {                    
        step++
        ctx.reply("Hello Welcome to Highbrow's bot. Please choose what kind of vacancy you want to post.", {reply_markup: {
            keyboard,
            resize_keyboard: true 
        }}).then(t =>language_button_id = t.message_id)
    })

    const adminId: number = -4184019520; 

    let companyName: string,
    experience: string,
    salary: string,
    location: string,
    description: string,
    jobType: string;

    bot.on('message', async(ctx: any) => {
        if(step === 1){
            jobType = ctx.message.text;
            const isFromKeyboard = keyboard.flat().includes(jobType);

                step++
                ctx.reply("Please write name of your company")

        }
        else if(step === 2){
            companyName = ctx.message.text;
           
            step++
            ctx.reply("How many experience should candidate have ") 
        }
        else if(step === 3){
            experience = ctx.message.text;
           
            step++
            ctx.reply("How much you can pay for the candidates ?") 
        }
        else if(step === 4){
            salary = ctx.message.text;
           
            step++
            ctx.reply("Where is located your office ?") 
        }
        else if(step === 5){
            location = ctx.message.text;
           
            step++
            ctx.reply("Please write full description about your job vacancy. ") 
        }
        else if(step === 6){
            description = ctx.message.text;
           const message = 
                `
                <b>${jobType}</b>
                Company name: ${companyName}
                Experince: ${experience}
                Salary: ${salary}
                Location: ${location}
                Description: ${description}
                `;

            step++
            await bot.telegram.sendMessage(adminId, 
                message , { parse_mode: 'HTML' }
            )
            ctx.replyWithHTML(message)
        }
    })
    

bot.launch()