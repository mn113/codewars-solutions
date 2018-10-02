public class Troll {
    /*
     * Strip all vowels out of a string:
     */
    public static String disemvowel(String str) {
        String vowels = "aeiouAEIOU";
        StringBuilder consonants = new StringBuilder();

        for (int i = 0; i < str.length(); i++) {
            String c = Character.toString(str.charAt(i));
            if (!vowels.contains(c)) {
                consonants.append(c);
            }
        }

        return consonants.toString();
    }
}
