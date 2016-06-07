package holdem;

import java.util.Arrays;
import org.junit.Test;
import static org.junit.Assert.*;

public class DeckTest {
    
    public DeckTest() {
    }

    /**
     * Test of dealCommunityCards method, of class Deck.
     */
    @Test
    public void testDealCommunityCards() throws Exception {
        System.out.println("dealCommunityCards");
        Deck instance = new Deck();
        String[] result = instance.dealCommunityCards();
        assertTrue(result.length == 3);
    }
    
    @Test
    public void testCommunityCardsProperty() {
        Deck instance = new Deck();
        String[] result = instance.dealCommunityCards();
        assertNotNull(instance.communityCards);
    }

    /**
     * Test of dealHoldCards method, of class Deck.
     */
    @Test
    public void testDealHoldCards() throws Exception {
        System.out.println("dealHoldCards");
        Deck instance = new Deck();
        String[] result = instance.dealHoldCards();
        //System.out.println(Arrays.toString(result));
        assertTrue(result.length == 2);
        
        String[] result2 = instance.dealHoldCards();
        assertNotEquals(result[0], result2[0]);
    }
}
