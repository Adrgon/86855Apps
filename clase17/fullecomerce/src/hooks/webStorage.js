// Utilidades para manejar el almacenamiento en web
export const webStorage = {
    setItem: (key, value) => {
        try {
            if (typeof window !== 'undefined') {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    },

    getItem: (key) => {
        try {
            if (typeof window !== 'undefined') {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : null;
            }
            return null;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return null;
        }
    },

    removeItem: (key) => {
        try {
            if (typeof window !== 'undefined') {
                localStorage.removeItem(key);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error removing from localStorage:', error);
            return false;
        }
    }
}; 
