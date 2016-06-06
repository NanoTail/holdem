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
        String[] cards = new String[]{"DA","DK","DQ","DJ","DT"};
        Hand hand = new Hand(cards);
        Rank instance = new Rank();
        instance.analyze(hand);
        assertEquals(hand.rank(), "Royal Flush");
    }
    
    @Test
    public void testHighCard() {
        System.out.println("High Card");
        String[] cards = new String[]{"S4","DT","H8","C9","H6"};
        Hand hand = new Hand(cards);
        Rank instance = new Rank();
        instance.analyze(hand);
        assertEquals(hand.rank(), "High Card");
    }
    
    @Test
    public void testOnePair() {
        System.out.println("One Pair");
        String[] cards = new String[]{"CA","S8","SQ","CQ","D3"};
        Hand hand = new Hand(cards);
        Rank instance = new Rank();
        instance.analyze(hand);
        assertEquals(hand.rank(), "One Pair");
    }
    
    @Test
    public void testTwoPair() {
        System.out.println("Two Pair");
        String[] cards = new String[]{"CA","S8","SQ","CQ","D8"};
        Hand hand = new Hand(cards);
        Rank instance = new Rank();
        instance.analyze(hand);
        assertEquals(hand.rank(), "Two Pair");
    }
    
    @Test
    public void testThreeOfaKind() {
        System.out.println("Three of a Kind");
        String[] cards = new String[]{"SA","H9","C9","DT","C9"};
        Hand hand = new Hand(cards);
        Rank instance = new Rank();
        instance.analyze(hand);
        assertEquals(hand.rank(), "Three of a Kind");
    }
    
    @Test
    public void testFlush() {
        System.out.println("Flush");
        String[] cards = new String[]{"S4","S5","S8","S7","SQ"};
        Hand hand = new Hand(cards);
        Rank instance = new Rank();
        instance.analyze(hand);
        assertEquals(hand.rank(), "Flush");
    }
    
    @Test
    public void testFourOfaKind() {
        System.out.println("Four of a Kind");
        String[] cards = new String[]{"H9","C7","S9","C9","D9"};
        Hand hand = new Hand(cards);
        Rank instance = new Rank();
        instance.analyze(hand);
        assertEquals(hand.rank(), "Four of a Kind");
    }
    
    @Test
    public void testFullHouse() {
        System.out.println("Full House");
        String[] cards = new String[]{"HA","HT","DT","CT","CA"};
        Hand hand = new Hand(cards);
        Rank instance = new Rank();
        instance.analyze(hand);
        assertEquals(hand.rank(), "Full House");
    }
    
    @Test
    public void testStraightFlush() {
        System.out.println("Straight Flush");
        String[] cards = new String[]{"D5","D7","D4","D6","D8"};
        Hand hand = new Hand(cards);
        Rank instance = new Rank();
        instance.analyze(hand);
        assertEquals(hand.rank(), "Straight Flush");
    }
    
    @Test
    public void testRoyalFlush() {
        System.out.println("Royal Flush");
        String[] cards = new String[]{"DT","DK","DQ","DA","DJ"};
        Hand hand = new Hand(cards);
        Rank instance = new Rank();
        instance.analyze(hand);
        assertEquals(hand.rank(), "Royal Flush");
    }
    
    @Test
    public void testStraight() {
        System.out.println("Straight");
        String[] cards = new String[]{"D5","D7","H4","D6","D8"};
        Hand hand = new Hand(cards);
        Rank instance = new Rank();
        instance.analyze(hand);
        assertEquals(hand.rank(), "Straight");
    }
    
}
