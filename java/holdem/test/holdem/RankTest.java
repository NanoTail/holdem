/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package holdem;

import org.junit.Test;
import static org.junit.Assert.*;

/**
 *
 * @author nilotpal
 */
public class RankTest {
    
    public RankTest() {
    }

    /**
     * Test of analyze method, of class Rank.
     */
    @Test
    public void testAnalyze() {
        System.out.println("analyze");
        Hand hand = null;
        Rank instance = new Rank();
        Hand expResult = null;
        Hand result = instance.analyze(hand);
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }
    
}
