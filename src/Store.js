import React, { useState } from 'react';
import { ITEMS_LIST, ITEM_TIERS } from './data/items';
import './Store.css';

const Store = ({ inventory, setInventory, setEquippedId }) => {
  const [activeTab, setActiveTab] = useState('inventory');
  const [opening, setOpening] = useState(false);
  const [newItems, setNewItems] = useState([]);
  const [feedback, setFeedback] = useState('');

  // Mock Stripe Products
  const products = [
    { id: 'pack_1', name: 'Arena Icon Pack - Single', price: '$0.50', count: 1 },
    { id: 'pack_10', name: 'Arena Icon Pack - 10-Pack', price: '$3.00', count: 10 },
    { id: 'unlock_all', name: 'Unlock All Icons', price: '$99.99', type: 'unlock' },
  ];

  const handleBuy = (product) => {
    // In a real app, this would trigger Stripe
    // For now, we mock success
    if (product.type === 'unlock') {
      alert('Redirecting to Stripe... (Mock: All items unlocked!)');
      const allIds = ITEMS_LIST.map(i => i.id);
      setInventory(prev => [...new Set([...prev, ...allIds])]);
      return;
    }

    setOpening(true);
    setFeedback(`Opening ${product.count} packs...`);

    setTimeout(() => {
      const pulled = [];
      for (let i = 0; i < product.count * 3; i++) { // 3 icons per pack
        pulled.push(pullItem());
      }
      setNewItems(pulled);
      setInventory(prev => [...prev, ...pulled.map(i => i.id)]);
      setOpening(false);
    }, 2000);
  };

  const pullItem = () => {
    const rand = Math.random();
    let cumulative = 0;
    let selectedTier = 1;
    for (let tier = 1; tier <= 10; tier++) {
      cumulative += ITEM_TIERS[tier].chance;
      if (rand <= cumulative) {
        selectedTier = tier;
        break;
      }
    }
    const tierItems = ITEMS_LIST.filter(i => i.tier === selectedTier);
    return tierItems[Math.floor(Math.random() * tierItems.length)];
  };

  const handleEquip = (id) => {
    setEquippedId(id);
    setFeedback(`Equipped item!`);
    setTimeout(() => setFeedback(''), 1000);
  };

  return (
    <div className="store-container">
      <div className="store-nav">
        <button onClick={() => setActiveTab('inventory')} className={activeTab === 'inventory' ? 'active' : ''}>Inventory</button>
        <button onClick={() => setActiveTab('shop')} className={activeTab === 'shop' ? 'active' : ''}>Shop</button>
      </div>

      {feedback && <div className="feedback-toast">{feedback}</div>}

      {activeTab === 'shop' && (
        <div className="shop-grid">
          {opening ? (
            <div className="opening-animation">
              <h2>Opening Packs...</h2>
              <div className="spinner"></div>
            </div>
          ) : newItems.length > 0 ? (
            <div className="new-items">
              <h3>You got:</h3>
              <div className="items-grid">
                {newItems.map((item, idx) => (
                  <div key={idx} className="item-card" style={{ borderColor: ITEM_TIERS[item.tier].color }}>
                     <div className="item-icon" style={{ backgroundColor: ITEM_TIERS[item.tier].color }}></div>
                     <span className="item-name">{item.name}</span>
                     <span className="item-tier" style={{ color: ITEM_TIERS[item.tier].color }}>{ITEM_TIERS[item.tier].name}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => setNewItems([])}>Collect</button>
            </div>
          ) : (
            <div className="products-list">
               {products.map(p => (
                 <div key={p.id} className="product-card">
                   <h3>{p.name}</h3>
                   <p>{p.price}</p>
                   <button onClick={() => handleBuy(p)}>Buy</button>
                 </div>
               ))}
               <div className="stripe-note">
                 <p>Payments processed securely via Stripe (Mock Mode)</p>
               </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'inventory' && (
        <div className="inventory-grid">
          {ITEMS_LIST.filter(i => inventory.includes(i.id)).length === 0 ? (
            <p>No items yet. Visit the shop!</p>
          ) : (
            ITEMS_LIST.filter(i => inventory.includes(i.id)).map(item => (
              <div key={item.id} className="item-card" onClick={() => handleEquip(item.id)} style={{ borderColor: ITEM_TIERS[item.tier].color }}>
                <div className="item-icon" style={{ backgroundColor: ITEM_TIERS[item.tier].color }}></div>
                <div className="item-info">
                   <span className="item-name">{item.name}</span>
                   <span className="item-tier" style={{ color: ITEM_TIERS[item.tier].color }}>{ITEM_TIERS[item.tier].name}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Store;
