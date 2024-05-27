import { Telegraf } from "telegraf"
import { config } from "./config";
import { EmployeeSearchModule } from "./modules/employee.search";


 const bot: Telegraf = new Telegraf(config.bot_token)


 const keyboard = [
    ['I am hiring people', 'I am looking for a job.']
]


let language_button_id: number;
    bot.start((ctx) => {                    
        ctx.reply("Welcome to the HIGHBROW bot. Please fill all places below from the bot. If everything is correct your vacancy will be posted within 24-48 hours.", {reply_markup: {
            keyboard,
            resize_keyboard: true 
        }}).then(t =>language_button_id = t.message_id)
    })
    const employeeModule = new EmployeeSearchModule(bot);
    bot.on('message', (ctx: any) => {
        // console.log(ctx.msg.text);
            employeeModule.controller(ctx);
        
    })

 
    

bot.launch()