/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package holdem;

import java.util.Arrays;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;

/**
 *
 * @author nilotpal
 */
public class HandTest {
    
    public HandTest() {
    }

    @Test
    public void testHandReduction() {
        String[] cards = new String[]{"DA","DK","DQ","DJ","DT"};
        Integer[] expectedCardValues = new Integer[]{14,13,12,11,10};
        Hand hand = new Hand(cards);
        assertNotNull("Hand is constructable", hand);
        assertEquals("Extracts cards suits", hand.suits, "DDDDD");
        assertArrayEquals(hand.cardValues, expectedCardValues);
        assertTrue("Calculates hand rank value", hand.rankBit > 0);
    }
    
}
