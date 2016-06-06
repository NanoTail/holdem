package holdem;

import java.util.*;
/**
 *
 * @author nilotpal
 */
public class Hand implements Comparable<Hand>{
    /**
     * Stores dealt cards for a hand
     */
    String[] cards = new String[5];
    
    private HashMap<String, Integer> hash = new HashMap();
    private String suits = "";
    private Integer[] cardValues = new Integer[5];
    private String rankName = "High Card";
    private int rank = 0;
    private int rankBit = 0;
    
    public Hand(String[] communityCards, String[] holdCards) {
        try {
            System.arraycopy(communityCards, 0, cards, 0, communityCards.length);
            System.arraycopy(holdCards, 0, cards, communityCards.length, holdCards.length);
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
        
        
        this.reduce();
        
        this.analyze();
    }
    
    public HashMap<String, Integer> hash () {
        return hash;
    }
    
    public Integer[] values () {
        return this.cardValues;
    }
    
    public String suits () {
        return this.suits;
    }
    
    public void setRank (String rankName, int rank) {
        this.rankName = rankName;
        this.rank = rank;
    }
    
    public int rank () {
        return this.rank;
    }
    
    public String rankName () {
        return this.rankName;
    }
    
    public int rankBit () {
        return this.rankBit;
    }
    
    public void analyze() {
        Rank analyzer = new Rank();
        analyzer.analyze(this);
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
                return (hash.get(aKey) < hash.get(bKey)) ? 1 : (hash.get(aKey) > hash.get(bKey)) ? -1 : (b - a);
            }
        });
        
        rankBit = cardValues[0]<<16|cardValues[1]<<12|cardValues[2]<<8|cardValues[3]<<4|cardValues[4];
    }

    @Override
    public int compareTo(Hand o) {
        int rankCompare = o.rank > this.rank ? 1 : o.rank < this.rank ? -1 : o.rank - this.rank;
        if(rankCompare != 0) {
            return rankCompare;
        } else {
            return (o.rankBit > this.rankBit) ? 1 : (o.rankBit < this.rankBit) ? -1 : (o.rankBit - this.rankBit);
        }
    }
}
