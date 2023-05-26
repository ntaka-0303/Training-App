export class DaysFunc { 
    static getToday(): string {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        const yyyy = today.getFullYear();
        const todayDate = yyyy + '-' + mm + '-' + dd;
        return todayDate;
    }

    static getDaysAgo(today:string, day:number): string {
        const oneDayAgo = new Date(today);
        oneDayAgo.setDate(oneDayAgo.getDate() - day);
        return oneDayAgo.toISOString().slice(0, 10);
    }

    static getWeeksAgo(today:string, week:number): string {
        const oneWeekAgo = new Date(today);
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7*week);
        return oneWeekAgo.toISOString().slice(0, 10);
    }

    static getMonthsAgo(today:string, month:number): string {
        const oneMonthAgo = new Date(today);
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - month);
        return oneMonthAgo.toISOString().slice(0, 10);
    }

    static decideDateBetweenFromTo(date:string, from:string, to:string): boolean {
        const d = new Date(date)
        const f = new Date(from)
        const t = new Date(to)
        if (d >= f && d <= t) {
            return true;
        }
        return false;
    }
};