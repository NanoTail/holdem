/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package holdem;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;

/**
 *
 * @author nilotpal
 */
public class Holdem {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        Deck deck = new Deck();
        deck.dealCommunityCards();
        ArrayList<Hand> hands = new ArrayList();
        for(int i = 0; i < 10; i++) {
            hands.add(new Hand(deck.communityCards, deck.dealHoldCards()));
        }
        
        Collections.sort(hands);
        
        for(int i = 0; i < 10; i++) {
            System.out.println(
                    Arrays.toString(hands.get(i).cards) + " : " +
                            hands.get(i).rank() + " : " +
                            hands.get(i).rankBit() + " : " +
                            Arrays.toString(hands.get(i).values()) + " : " +
                            hands.get(i).rankName()
            );
        }
    }
    
}
