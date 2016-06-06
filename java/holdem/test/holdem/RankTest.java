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
        String[] comCards = new String[]{"DA","DK","DQ"};
        String[] holdCards = new String[]{"DJ","DT"};
        Hand hand = new Hand(comCards, holdCards);
        Rank instance = new Rank();
        instance.analyze(hand);
        assertEquals(hand.rankName(), "Royal Flush");
    }
    
    @Test
    public void testHighCard() {
        System.out.println("High Card");
        String[] comCards = new String[]{"S4","DT","H8"};
        String[] holdCards = new String[]{"C9","H6"};
        Hand hand = new Hand(comCards, holdCards);
        Rank instance = new Rank();
        instance.analyze(hand);
        assertEquals(hand.rankName(), "High Card");
    }
    
    @Test
    public void testOnePair() {
        System.out.println("One Pair");
        String[] comCards = new String[]{"CA","S8","SQ"};
        String[] holdCards = new String[]{"CQ","D3"};
        Hand hand = new Hand(comCards, holdCards);
        Rank instance = new Rank();
        instance.analyze(hand);
        assertEquals(hand.rankName(), "One Pair");
    }
    
    @Test
    public void testTwoPair() {
        System.out.println("Two Pair");
        String[] comCards = new String[]{"CA","S8","SQ"};
        String[] holdCards = new String[]{"CQ","D8"};
        Hand hand = new Hand(comCards, holdCards);
        Rank instance = new Rank();
        instance.analyze(hand);
        assertEquals(hand.rankName(), "Two Pair");
    }
    
    @Test
    public void testThreeOfaKind() {
        System.out.println("Three of a Kind");
        String[] comCards = new String[]{"SA","H9","C9"};
        String[] holdCards = new String[]{"DT","C9"};
        Hand hand = new Hand(comCards, holdCards);
        Rank instance = new Rank();
        instance.analyze(hand);
        assertEquals(hand.rankName(), "Three of a Kind");
    }
    
    @Test
    public void testFlush() {
        System.out.println("Flush");
        String[] comCards = new String[]{"S4","S5","S8"};
        String[] holdCards = new String[]{"S7","SQ"};
        Hand hand = new Hand(comCards, holdCards);
        Rank instance = new Rank();
        instance.analyze(hand);
        assertEquals(hand.rankName(), "Flush");
    }
    
    @Test
    public void testFourOfaKind() {
        System.out.println("Four of a Kind");
        String[] comCards = new String[]{"H9","C7","S9"};
        String[] holdCards = new String[]{"C9","D9"};
        Hand hand = new Hand(comCards, holdCards);
        Rank instance = new Rank();
        instance.analyze(hand);
        assertEquals(hand.rankName(), "Four of a Kind");
    }
    
    @Test
    public void testFullHouse() {
        System.out.println("Full House");
        String[] comCards = new String[]{"HA","HT","DT"};
        String[] holdCards = new String[]{"CT","CA"};
        Hand hand = new Hand(comCards, holdCards);
        Rank instance = new Rank();
        instance.analyze(hand);
        assertEquals(hand.rankName(), "Full House");
    }
    
    @Test
    public void testStraightFlush() {
        System.out.println("Straight Flush");
        String[] comCards = new String[]{"D5","D7","D4"};
        String[] holdCards = new String[]{"D6","D8"};
        Hand hand = new Hand(comCards, holdCards);
        Rank instance = new Rank();
        instance.analyze(hand);
        assertEquals(hand.rankName(), "Straight Flush");
    }
    
    @Test
    public void testRoyalFlush() {
        System.out.println("Royal Flush");
        String[] comCards = new String[]{"DT","DK","DQ"};
        String[] holdCards = new String[]{"DA","DJ"};
        Hand hand = new Hand(comCards, holdCards);
        Rank instance = new Rank();
        instance.analyze(hand);
        assertEquals(hand.rankName(), "Royal Flush");
    }
    
    @Test
    public void testStraight() {
        System.out.println("Straight");
        String[] comCards = new String[]{"D5","D7","H4"};
        String[] holdCards = new String[]{"D6","D8"};
        Hand hand = new Hand(comCards, holdCards);
        Rank instance = new Rank();
        instance.analyze(hand);
        assertEquals(hand.rankName(), "Straight");
    }
    
}
