using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VakifBank.DSA.YHB.MobileApi.Messages.Core;

namespace VakifBank.DSA.YHB.MobileApi.Messages.SOkulTahsilatMobilSahaSatis
{
    public class GetIntelligenceForSchoolPaymentResponse : IResponseData
    {
        public bool Status  { get; set; } // IstihbaratDurumu
        public int Result { get; set; } // IstihbaratSonucu
        public bool HasAvailableAccount { get; set; } // UygunHesapVarMi
        public int AccountStatusResult { get; set; } // HesapDurumuSonucu
        public List<string> AccountList { get; set; } // HesapList 
        public bool HasMobilePhone { get; set; } // CepTelefonVarMi
        public bool HasEmail { get; set; } // EpostaVarMi 
        public bool IsOccupationSuitable { get; set; } // MeslekUygunMu
        public bool IsPersonel  { get; set; } // PersonelMi
        public bool IsPaymentPerformanceSuitable { get; set; } // OdemePerformansıUygunmu
        public bool IsSuitableForGuarantor { get; set; } // GarantorUygunluk


    }
}
