import java.util.Random;
import java.util.Calendar;
import java.util.Date;

public class RandomNumberGenerator {
    public static void main(String[] args) {
        Random random = new Random();
        Calendar calendar = Calendar.getInstance();
        int currentYear = calendar.get(Calendar.YEAR);
        int currentMonth = calendar.get(Calendar.MONTH);
        int currentDay = calendar.get(Calendar.DAY_OF_MONTH);
        int randomNumber = random.nextInt(7 - 3 + 1) + 3;

        // Add the random number of days to the current date
        calendar.set(currentYear, currentMonth, currentDay);
        calendar.add(Calendar.DAY_OF_MONTH, randomNumber);

        // Get the total date
        Date totalDate = calendar.getTime();

        System.out.println("Total date: " + totalDate);
    }
}