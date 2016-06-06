/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package holdem;

import java.util.*;
/**
 *
 * @author nilotpal
 */
public class Hand {
    /**
     * Stores dealt cards for a hand
     */
    String[] cards;
    
    HashMap<String, Integer> hash = new HashMap<String, Integer>();
    String suits = "";
    Integer[] cardValues = new Integer[5];
    int rank = 0;
    int rankBit = 0;
    
    public Hand(String[] cards) {
        this.cards = cards;
        
        this.reduce();
    }
    
    private String[] toValue (String[] cards) {
        return Arrays.toString(cards).replaceAll("[CDHS ]", "").replace("[","").replace("]", "").split(",");
    }
    
    private int faceValue (String face) {
        return face.equals("T") ? 10 
                : face.equals("J") ? 11 
                : face.equals("Q") ? 12 
                : face.equals("K") ? 13 
                : face.equals("A") ? 14 
                : Integer.parseInt(face);
    }
    
    private void reduce () {
        //Extract card suits
        this.suits = Arrays.toString(this.cards).replaceAll("[^CDHS]", "");
        
        String[] cards = this.toValue(this.cards);

        for(int i=0; i < cards.length; i++) {
            cardValues[i] = faceValue(cards[i]);
        }
        
        for(int i=0; i < 5; i++) {
            String key = Integer.toString(cardValues[i]);
            hash.put(
                    key, 
                    (hash.get(key) != null && hash.get(key) >= 1) ? 
                            hash.get(key) + 1 : 1);
        }
        
        Arrays.sort(cardValues, new Comparator<Integer>() {
            @Override
            public int compare(Integer a, Integer b) {
                String aKey = Integer.toString(a);
                String bKey = Integer.toString(b);
                return (hash.get(aKey) < hash.get(bKey)) ? +1 : (hash.get(aKey) > hash.get(bKey)) ? -1 : (b - a);
            }
        });
        
        rankBit = cardValues[0]<<16|cardValues[1]<<12|cardValues[2]<<8|cardValues[3]<<4|cardValues[4];
    }
}
