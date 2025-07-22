import React, { useEffect } from 'react';
import { X, Zap, ShoppingCart, Lock } from 'lucide-react';
import { upgradeShop } from '../data/gameData';
import { canPurchaseUpgrade } from '../utils/gameUtils';

const UpgradeShopModal = ({ isOpen, onClose, user, onPurchaseUpgrade }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePurchase = (upgrade) => {
    if (canPurchaseUpgrade(upgrade, user)) {
      onPurchaseUpgrade(upgrade);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto mx-4">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
            <ShoppingCart className="w-6 h-6 text-purple-600" />
            <span>Upgrade Shop</span>
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {/* Energy Display */}
          <div className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
            <div className="flex items-center justify-center space-x-2">
              <Zap className="w-6 h-6 text-yellow-500" />
              <span className="text-xl font-bold text-gray-800">
                {user.energy} Energy Available
              </span>
            </div>
          </div>

          {/* Upgrades Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upgradeShop.map((upgrade) => {
              const canPurchase = canPurchaseUpgrade(upgrade, user);
              const isOwned = user.upgrades?.[upgrade.id] && !upgrade.repeatable;
              const ownedCount = upgrade.repeatable ? (user.upgrades?.[upgrade.id] || 0) : 0;

              return (
                <div
                  key={upgrade.id}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    canPurchase && !isOwned
                      ? 'border-purple-300 bg-purple-50 hover:border-purple-400'
                      : isOwned
                      ? 'border-green-300 bg-green-50'
                      : 'border-gray-300 bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{upgrade.icon}</span>
                      <div>
                        <h3 className="font-bold text-gray-800 flex items-center space-x-2">
                          <span>{upgrade.name}</span>
                          {isOwned && !upgrade.repeatable && (
                            <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                              OWNED
                            </span>
                          )}
                          {upgrade.repeatable && ownedCount > 0 && (
                            <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                              x{ownedCount}
                            </span>
                          )}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">{upgrade.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Required Level:</span>
                      <span className="text-sm font-medium text-gray-800">{upgrade.unlockLevel}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Cost:</span>
                      <div className="flex items-center space-x-1">
                        <Zap className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-bold text-gray-800">{upgrade.cost}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handlePurchase(upgrade)}
                      disabled={!canPurchase || (isOwned && !upgrade.repeatable)}
                      className={`w-full py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 ${
                        !canPurchase || (isOwned && !upgrade.repeatable)
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 shadow-lg hover:shadow-xl'
                      }`}
                    >
                      {!canPurchase && (
                        <>
                          <Lock className="w-4 h-4" />
                          <span>
                            {user.energy < upgrade.cost 
                              ? 'Not Enough Energy' 
                              : 'Level Required'
                            }
                          </span>
                        </>
                      )}
                      {canPurchase && isOwned && !upgrade.repeatable && (
                        <>
                          <span>✓ Purchased</span>
                        </>
                      )}
                      {canPurchase && (!isOwned || upgrade.repeatable) && (
                        <>
                          <ShoppingCart className="w-4 h-4" />
                          <span>
                            {upgrade.repeatable && ownedCount > 0 ? 'Upgrade Again' : 'Purchase'}
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Help Text */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-800 mb-2">💡 How to Earn Energy</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Gain followers through likes, comments, shares, and posts</li>
              <li>• Higher career levels give more energy per follower</li>
              <li>• Energy accumulates fractionally - every action counts!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradeShopModal;