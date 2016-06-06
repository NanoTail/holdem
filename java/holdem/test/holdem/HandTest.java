/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package holdem;

import java.util.Arrays;
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
        String[] comCards = new String[]{"DA","DK","DQ"};
        String[] holdCards = new String[]{"DJ","DT"};
        Integer[] expectedCardValues = new Integer[]{14,13,12,11,10};
        Hand hand = new Hand(comCards, holdCards);
        assertNotNull("Hand is constructable", hand);
        assertEquals("Extracts cards suits", hand.suits(), "DDDDD");
        assertArrayEquals(hand.values(), expectedCardValues);
        assertTrue("Calculates hand rank value", hand.rankBit() > 0);
    }

    /**
     * Test of setRank method, of class Hand.
     */
    @Test
    public void testSetRank() {
        System.out.println("setRank");
        String rank = "Royal Flush";
        String[] comCards = new String[]{"DA","DK","DQ"};
        String[] holdCards = new String[]{"DJ","DT"};
        Hand instance = new Hand(comCards, holdCards);
        instance.setRank(rank, 10);
        assertEquals(instance.rankName(), rank);
    }   
}
