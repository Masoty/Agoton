import connectionDB from "@/components/db/mongo";


export function connectWrapper<T extends (...args: any[]) => any> (
    func: T,
) {
    return async (...args: Parameters<T>) => {
        
        try {
            await connectionDB()
            
            const result = await func(...args); // Вызываем исходную функцию
            
            return result; // Возвращаем результат работы функции
        } catch (err) {
            // @ts-ignore
            return { err: err.message }
        }
        
    };
}