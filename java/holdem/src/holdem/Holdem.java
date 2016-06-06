/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package holdem;

import java.util.Arrays;

/**
 *
 * @author nilotpal
 */
public class Holdem {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        String[] cards = new String[]{"D9","DK","D9","DJ","DT"};
        Hand hand = new Hand(cards);
        
        /*System.out.println(hand.rankBit);
        System.out.println(hand.hash.toString());
        System.out.println(hand.suits);
        System.out.println(Arrays.toString(hand.cardValues));*/
    }
    
}
