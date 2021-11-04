import FitnessPlanRepo from '../repo/fitnessPlanRepo';
import UserRepo from '../repo/userRepo';
import { Expo, ExpoPushMessage } from 'expo-server-sdk';

const expo = new Expo();

const NotifyUsersOfBadWeather = async (datesToNotify: Date[]) => {
    const expoTokens: string[] = [];
    const userIDs: string[] = [];
    try {
        for (const currDate of datesToNotify) {
            currDate.setHours(0, 0, 0);
            const fitnessPlans = await FitnessPlanRepo.GetFitnessPlansForDate(currDate);
            for (const plan of fitnessPlans) {
                if (plan.owner) {
                    userIDs.push(plan.owner);
                }
            }
        }

        const users = await UserRepo.GetUsersByMultipleIDs(userIDs);
        for (const user of users) {
            if (user.expoToken && Expo.isExpoPushToken(user.expoToken)) {
                expoTokens.push(user.expoToken);
            } else {
                console.info(`NotifyService: NotifyUsersOfBadWeather: ${user._id} has no/invalid expo token`);
            }
        }

        const messageObjs: ExpoPushMessage[] = [];
        expoTokens.forEach((token) => {
            const newMessageObj: ExpoPushMessage = {
                to: token,
                sound: 'default',
                body: "Your fitness plan may be affected by Bad Weather!",
            };
            messageObjs.push(newMessageObj);
        });

        const ticketChunks = await expo.sendPushNotificationsAsync(messageObjs);
        ticketChunks.forEach((chunk) => {
            console.info(`NotifyService: NotifyUsersOfBadWeather: Ticket chunk of message ${chunk}`);
        });

        console.log(expoTokens);
    } catch (err) {
        console.error(`NotifyService: NotifyUsersOfBadWeather: ${err.message}`);
    }
}

const NotifyService = {
    NotifyUsersOfBadWeather
}

export { NotifyService as default };